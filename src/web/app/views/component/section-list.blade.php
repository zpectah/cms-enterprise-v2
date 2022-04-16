<section class="section section--list">
    @if($sectionTitle)
        <h3
            class="title title--section"
        >
            {{$sectionTitle}}
        </h3>
    @endif
    <div
        class="section-list section-list--{{$context}}"
        data-list-context="{{$context}}"
    >
        @foreach($items as $item)
            @include('component.section-list-item', [ 'item' => $item ])
        @endforeach
    </div>
</section>