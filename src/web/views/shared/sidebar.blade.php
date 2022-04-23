{{--
Layout sidebar
--}}
<aside class="sidebar">
    @include('widget.widget-search', [ 'formId' => 'WidgetSearchForm' ])
    @include('widget.widget-subscription', [ 'formId' => 'WidgetSubscriptionForm' ])
    @include('widget.widget-login', [ 'formId' => 'WidgetLoginForm' ])
    @include('widget.widget-last-posts', [
        'widgetTitle' => $t('widget:last-posts.title'),
        'props' => $custom_data['sidebar_posts'], // TODO #posts #category
    ])
    @include('widget.widget-links', [
        'menuData' => $custom_data['sidebar_links'], // TODO #menu
    ])
</aside>