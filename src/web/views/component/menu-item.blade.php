@php
    $ml = $menuLink($item);
@endphp
<li
    class="menu-item menu-item--{{$item['type']}} {{$ml['selected'] ? 'selected' : ''}}"
>
    <a
        href="{{$ml['path']}}"
        target="{{$ml['target']}}"
        class="menu-item-link"
    >
        {{$ml['label']}}
    </a>
    @if($item['children'])
        <ul class="menu-item-children">
            @foreach($item['children'] as $child)
                @include('component.menu-item', [ 'item' => $child ])
            @endforeach
        </ul>
    @endif
</li>