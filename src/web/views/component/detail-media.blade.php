@if($detail['detail']['__media'])
    <section
        class="section section--media"
    >
        <h3
            class="title title--section"
        >
            {{$t('common:title.media')}}
        </h3>
        <ul
            class="list list-media"
        >
            @foreach($detail['detail']['__media'] as $media)
                <li
                    class="list-item list-media-item"
                >
                    <article
                        class="list-media-item-article type--{{$media['type']}}"
                        data-lightbox="true"
                        data-lightbox-type="{{$media['type']}}"
                        data-lightbox-src="{{$uploadPath($media['file_name'], $media['type'])}}"
                    >
                        @include('component.media-item', [
                            'mediaType' => $media['type'],
                            'mediaName' => $media['name'],
                            'mediaFileName' => $media['file_name'],
                        ])
                    </article>
                </li>
            @endforeach
        </ul>
    </section>
@endif
