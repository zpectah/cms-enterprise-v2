@if($detail['detail']['__attachments'])
    <section
        class="section section--media"
    >
        <h3
            class="title title--section"
        >
            {{$t('common:title.attachments')}}
        </h3>
        <ul
            class="list list-media"
        >
            @foreach($detail['detail']['__attachments'] as $attachment)
                <li
                    class="list-item list-media-item"
                >
                    <article
                        class="list-media-item-article type--{{$attachment['type']}}"
                        data-lightbox="true"
                        data-lightbox-type="{{$attachment['type']}}"
                        data-lightbox-src="{{$uploadPath($attachment['file_name'], $attachment['type'])}}"
                    >
                        @include('component.media-item', [
                            'mediaType' => $attachment['type'],
                            'mediaName' => $attachment['name'],
                            'mediaFileName' => $attachment['file_name'],
                        ])
                    </article>
                </li>
            @endforeach
        </ul>
    </section>
@endif
