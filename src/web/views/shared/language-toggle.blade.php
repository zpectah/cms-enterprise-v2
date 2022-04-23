{{--
User language switcher
--}}
@if($language['active_count'] > 1)
    <nav class="ui-menu-nav horizontal">
        <ul class="ui-menu ui-menu--horizontal">
            @foreach($language['active'] as $lng)
                <li class="ui-menu-item {{$lng == $lang ? 'selected' : ''}}">
                    <a
                        href="{{$route['attrs']['parsed']}}{{$lng !== $language['default'] ? '?lang=' . $lng : ''}}"
                        class="ui-menu-item-link"
                    >
                        {{$language['locales'][$lng]['label']}}
                    </a>
                </li>
            @endforeach
        </ul>
    </nav>
@endif