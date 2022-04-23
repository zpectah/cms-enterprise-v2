@if($member['actions']['search'])
    <div class="widget search">
        <div class="widget-main">
            @include('component.search-form', [ 'formId' => 'WidgetFormSearch' ])
        </div>
    </div>
@endif