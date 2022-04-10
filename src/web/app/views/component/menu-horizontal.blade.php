<nav>
    <ul>
        @foreach($menuData['__items'] as $item)
            @php
                $ml = $menuLink($item);
            @endphp
            <li
                class="{{$ml['selected'] ? 'selected' : ''}}"
                data-x="{{$ml['s']}}"
            >
                <a
                    href="{{$ml['path']}}"
                    target="{{$ml['target']}}"
                >
                    {{$ml['label']}}
                </a>
            </li>
        @endforeach
    </ul>
</nav>