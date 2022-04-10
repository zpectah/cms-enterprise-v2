@php
    $data = $menuData ?? [];
@endphp
<div class="widget widget-links">
    <h4 class="title title--widget">
        {{$data['lang'][$lang]['label']}}
    </h4>
    <div class="widget-main">
        @include('component.navigation', [
            'menuData' => $data,
            'type' => 'vertical',
        ])
    </div>
</div>