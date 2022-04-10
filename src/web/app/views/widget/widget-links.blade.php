@php
    $data = $menuData ?? [];
@endphp
<div class="widget widget-links">
    @include('component.navigation', [
        'menuData' => $data,
        'type' => 'vertical',
    ])
</div>