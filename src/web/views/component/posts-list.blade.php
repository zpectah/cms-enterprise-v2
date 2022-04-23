{{--
Posts list

* $itemsList
* $linkPrefix

--}}
@php
    $itemsList = $itemsList ?? [];
    $linkPrefix = '/detail/posts/';
@endphp
<ul class="list">
    @foreach($itemsList as $post)
    <li
        class="list-item item--posts"
    >
        <a
                href="{{$languageLink($linkPrefix . $post['name'])}}"
                target="_self"
                class="list-item-link"
        >
            {{$post['lang'][$lang]['title']}}
        </a>
    </li>
    @endforeach
</ul>