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
        @include('widget.widget-last-posts', [
            'widgetTitle' => $t('widget:last-posts.title'),
            'props' => [
                'tag_id' => 3,
                'limit' => 3,
            ],
        ])
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-links', [
            'menuData' => $menu['custom']['sidebar-links'],
        ])
    </div>
</aside>