{{--
Menu navigation item (recursive children rendering)

* $menuItem

--}}
@php
    $ml = $menuLink($menuItem);
@endphp
<li class="component menu-item item--{{$menuItem['type']}} {{$ml['selected'] ? 'selected' : ''}}">
    <a
            href="{{$ml['path']}}"
            target="{{$ml['target']}}"
            class="menu-item-link"
    >
        {{$ml['label']}}
    </a>
    @if($menuItem['children'])
        <ul class="menu-item-children">
            @foreach($menuItem['children'] as $child)
                @include('component.menu-item', [ 'menuItem' => $child ])
            @endforeach
        </ul>
    @endif
</li>