<section class="section section--list">
    <div
        class="section-list section-list--{{$context}}"
        data-list-context="{{$context}}"
    >
        @foreach($items as $item)
            @include('component.section-list-item', [ 'item' => $item ])
        @endforeach
    </div>
</section>