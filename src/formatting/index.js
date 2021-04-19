const NodeWriters = {
  AssignmentExpression: function (node) {
    return `${WN(node.left)} ${node.operator} ${WN(node.right)}`;
  },
  BinaryExpression: function (node) {
    return `${WN(node.left)} ${node.operator} ${WN(node.right)}`;
  },
  BlockStatement: function (node) {
    return writeNodes(
      node.body,
      NodeWriters.source.substring(node.start, node.end),
      node.start,
      true
    );
  },
  CallExpression: function (node) {
    let out = `${WN(node.callee)}(`;
    let i = 0;
    node.arguments.forEach((arg) => {
      if (i > 0) {
        out += ", ";
      }
      out += `${WN(arg)}`;
      i++;
    });

    out += ")";
    return out;
  },
  DoWhileStatement: function (node) {
    return `do {\n${WN(node.body)}} while(${WN(node.test)});`;
  },
  ExpressionStatement: function (node) {
    return `${WN(node.expression)};`;
  },
  ForStatement: function (node) {
    let out = `for(${WN(node.init, node)}; ${WN(node.test)}; ${WN(
      node.update
    )}) {\n`;
    out += `${WN(node.body)}`;
    out += "\n}";
    return out;
  },
  FunctionDeclaration: function (node) {
    return writeFunction(node);
  },
  FunctionExpression: function (node) {
    return writeFunction(node);
  },
  Identifier: function (node) {
    return node.name;
  },
  IfStatement: function (node) {
    return `if (${WN(node.test)}) {\n${WN(node.consequent)}}`;
  },
  Literal: function (node) {
    return node.raw;
  },
  LogicalExpression: function (node) {
    return `${WN(node.left)} ${node.operator} ${WN(node.right)}`;
  },
  MemberExpression: function (node) {
    return `${WN(node.object)}.${WN(node.property)}`;
  },
  objj_ImportStatement: function (node) {
    if (node.objj) {
      if (node.objj.local) {
        return `@import "${node.objj.filename}"`;
      } else {
        return `@import <${node.objj.filename}>`;
      }
    }
  },
  objj_MessageSendExpression: function (node) {
    if (node.objj) {
      let objj = node.objj;
      let receiver = `${WN(objj.receiver)}`;
      let sel = "";
      let i = 0;
      objj.selectors.forEach((selector) => {
        if (i > 0) {
          sel += " ";
        }
        sel += `${WN(selector)}`;
        if (i < objj.args.length) {
          sel += `:${WN(objj.args[i])}`;
        }
        i++;
      });
      return `[${receiver} ${sel}]`;
    }
  },
  VariableDeclaration: function (node, parent) {
    let out = "";
    let insideForLoop = parent && parent.type === "ForStatement";
    if (node.declarations) {
      let i = 0;
      node.declarations.forEach((decNode) => {
        if (i > 0) {
          out += `,${!insideForLoop ? "\n\t" : " "}`;
        }
        out += WN(decNode);
        i++;
      });
    }

    return `${node.kind} ${out}${!insideForLoop ? ";" : ""}`;
  },
  VariableDeclarator: function (node) {
    return `${WN(node.id)} = ${WN(node.init)}`;
  },
  WhileStatement: function (node) {
    return `while(${WN(node.test)}){\n${WN(node.body)}}`;
  },
};

const writeNode = function (node, parent) {
  if (node) {
    let type = node.type;
    if (NodeWriters[type]) {
      return NodeWriters[type](node, parent);
    } else {
      if (NodeWriters.source) {
        return NodeWriters.source.substring(node.start, node.end);
      }
    }
  }
  return "";
};

const writeNodes = function (nodeList, source, lastEnd, blockStatement) {
  //console.log(nodeList);
  let formatted = "";
  lastEnd = lastEnd || 0;
  //console.log("lastEnd =" + lastEnd);
  let i = 0;
  nodeList.forEach((node) => {
    i++;
    formatted += (blockStatement ? "\t" : "") + WN(node) + "\n";
    lastEnd = node.end;
  });
  return formatted;
};

const WN = writeNode;

const writeFunction = function (node) {
  let out = "";
  if (node.id) {
    out = `function ${WN(node.id)}(`;
  } else {
    out = `function(`;
  }
  let i = 0;
  node.params.forEach((param) => {
    if (i > 0) {
      out += ", ";
    }
    out += WN(param);
    i++;
  });
  out += ") {\n";
  out += `${WN(node.body)}`;
  out += "}";
  return out;
};

module.exports = function (nodeList, source) {
  NodeWriters.source = source;
  return writeNodes(nodeList, NodeWriters.source, 0, false);
};
