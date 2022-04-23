<div class="widget last-posts">
    @if($widgetTitle)
        <h4 class="title title--widget">
            {{$widgetTitle}}
        </h4>
    @endif
    <div class="widget-main">
        @include('component.posts-list', [
            'itemsList' => $getPosts($props),
        ])
    </div>
</div>