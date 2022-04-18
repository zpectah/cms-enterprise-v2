<aside class="sidebar">
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
            'props' => $custom_data['sidebar_posts'], // TODO #posts #category
        ])
    </div>
    <div class="widget-wrapper">
        @include('widget.widget-links', [
            'menuData' => $custom_data['sidebar_links'], // TODO #menu
        ])
    </div>
</aside>