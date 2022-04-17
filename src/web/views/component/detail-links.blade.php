@if($detail['detail']['__links'])
    <section
        class="section section--links"
    >
        <h3
            class="title title--section"
        >
            {{$t('common:label.links')}}
        </h3>
        <ul
            class="list"
        >
            @foreach($detail['detail']['__links'] as $link)
                <li
                    class="list-item"
                >
                    <a
                        href="{{$link}}"
                        target="_blank"
                        class="list-item-link"
                    >
                        {{$link}}
                    </a>
                </li>
            @endforeach
        </ul>
    </section>
@endif
