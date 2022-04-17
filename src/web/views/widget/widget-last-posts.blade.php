<div class="widget-last-posts">
    @if($widgetTitle)
        <h4 class="title title--widget">
            {{$widgetTitle}}
        </h4>
    @endif
    <div class="widget-main">
        <ul
            class="list"
        >
            @foreach($get_posts($props) as $post)
                <li
                    class="list-item"
                >
                    <a
                            href="{{$languageLink('/detail/posts/' . $post['name'])}}"
                            target="_self"
                            class="list-item-link"
                    >
                        {{$post['lang'][$lang]['title']}}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</div>