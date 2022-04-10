<aside class="sidebar page-layout-sidebar">
    <div class="widget-wrapper">
        @include('widget.widget-search')
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-subscription')
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-login')
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-last-posts')
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-links', [
            'menuData' => $menu['custom']['sidebar-links'],
        ])
    </div>
</aside>