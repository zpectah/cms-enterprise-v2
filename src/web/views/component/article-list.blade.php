{{--
Article list: displays list of posts/articles

* $context
* $itemsList

--}}
<div class="article-list {{$context}}">
    @foreach($itemsList as $articleItem)
        @include('component.article-list-item', [ 'articleItem' => $articleItem ])
    @endforeach
</div>