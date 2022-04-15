<div class="widget-last-posts">
    <h4 class="title title--widget">
        {{$t('widget:last-posts.title')}}
    </h4>
    <div class="widget-main">
        <nav>
            <ul>
                @foreach($get_posts([ 'limit' => 3, 'tag_id' => 3 ]) as $post)
                    <li>
                        <a
                            href="{{$languageLink('/detail/posts/' . $post['name'])}}"
                            target="_self"
                        >
                            {{$post['name']}}
                        </a>
                    </li>
                @endforeach
            </ul>
        </nav>
    </div>
</div>