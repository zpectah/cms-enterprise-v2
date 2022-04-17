@php
    $menuType = $menuType ?? 'horizontal';
@endphp
<ul class="menu menu--{{$menuType}}">
    @foreach($menuData['__items'] as $item)
        @include('component.menu-item', [ 'item' => $item ])
    @endforeach
</ul>