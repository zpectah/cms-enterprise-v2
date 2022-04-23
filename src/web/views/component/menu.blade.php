{{--
Menu navigation

* $menuType: horizontal | vertical
* $menuData: object menu

--}}
@php
    $menuType = $menuType ?? 'horizontal';
    $menuData = $menuData ?? [];
@endphp
<nav class="component menu-nav {{$menuType}}">
    <ul class="component menu menu--{{$menuType}}">
        @foreach($menuData['__items'] as $menuItem)
            @include('component.menu-item', [ 'menuItem' => $menuItem ])
        @endforeach
    </ul>
</nav>