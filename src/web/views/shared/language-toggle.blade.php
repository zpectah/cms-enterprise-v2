@if($language['active_count'] > 1)
    <nav
        class="navigation navigation--horizontal"
    >
        <ul
            class="menu menu--horizontal"
        >
            @foreach($language['active'] as $lng)
                <li
                    class="menu-item"
                >
                    <a
                        href="{{$route['attrs']['parsed']}}{{$lng !== $language['default'] ? '?lang=' . $lng : ''}}"
                        class="menu-item-link"
                    >
                        {{$language['locales'][$lng]['label']}}
                    </a>
                </li>
            @endforeach
        </ul>
    </nav>
@endif