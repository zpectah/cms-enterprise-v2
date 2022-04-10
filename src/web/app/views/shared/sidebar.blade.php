<aside class="sidebar page-layout-sidebar">
    <div class="widget-wrapper">
        @include('widget.widget-search')
    </div>
    <div class="widget-wrapper">
        <h4 class="title title--widget">
            Subscription
        </h4>
        @include('widget.widget-subscription')
    </div>
    <div class="widget-wrapper">
        <h4 class="title title--widget">
            Log in
        </h4>
        @include('widget.widget-login')
    </div>
    <div class="widget-wrapper">
        <h4 class="title title--widget">
            Last posts
        </h4>
        @include('widget.widget-last-posts')
    </div>
    <div class="widget-wrapper">
        <h4 class="title title--widget">
            Links
        </h4>
        @include('widget.widget-links', [ 'menuData' => $menu['custom']['sidebar-links'] ])
    </div>
</aside>