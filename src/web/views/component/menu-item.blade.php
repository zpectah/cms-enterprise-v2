{{--
Menu navigation item (recursive children rendering)

* $menuItem

--}}
@php
    $ml = $menuLink($menuItem);
@endphp
<li class="ui-menu-item {{$menuItem['type']}} {{$ml['selected'] ? 'selected' : ''}}">
    <a
            href="{{$ml['path']}}"
            target="{{$ml['target']}}"
            class="ui-menu-item-link"
    >
        {{$ml['label']}}
    </a>
    @if($menuItem['children'])
        <ul class="ui-menu-item-children">
            @foreach($menuItem['children'] as $child)
                @include('component.menu-item', [ 'menuItem' => $child ])
            @endforeach
        </ul>
    @endif
</li>