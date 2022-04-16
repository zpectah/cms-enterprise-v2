<aside class="sidebar page-layout-sidebar">
    <div class="widget-wrapper">
        @include('widget.widget-search', [ 'formId' => 'WidgetSearchForm' ])
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-subscription', [ 'formId' => 'WidgetSubscriptionForm' ])
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-login', [ 'formId' => 'WidgetLoginForm' ])
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