{{--
Article list: displays list of posts/articles

* $context
* $itemsList

--}}
<div class="component article-list {{$context}}">
    @foreach($itemsList as $articleItem)
        @include('component.article-list-item', [ 'articleItem' => $articleItem ])
    @endforeach
</div>