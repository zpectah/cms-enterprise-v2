{{--
Posts list

* $itemsList
* $linkPrefix

--}}
@php
    $itemsList = $itemsList ?? [];
    $linkPrefix = '/detail/posts/';
@endphp
<ul class="ui-list">
    @foreach($itemsList as $post)
    <li
        class="ui-list-item item--posts"
    >
        <a
                href="{{$languageLink($linkPrefix . $post['name'])}}"
                target="_self"
                class="ui-list-link"
        >
            {{$post['lang'][$lang]['title']}}
        </a>
    </li>
    @endforeach
</ul>