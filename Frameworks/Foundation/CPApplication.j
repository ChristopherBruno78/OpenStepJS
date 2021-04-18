@import "CPObject.j"

var CPApp = null;

@implementation CPApplication : CPObject

+ (CPApplication)sharedApplication{

    if (!CPApp)
    {
        CPApp = [CPApplication new];
    }
    return CPApp;
}

- (id)init
{

    self = [super init];

    CPApp = self;

    if (self)
    {
    }

    return self;
}

@end
