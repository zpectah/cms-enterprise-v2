@if($detail['detail']['__media'])
    <section
            class="section section--media"
    >
        <ul
                class="list list-attachments"
        >
            @foreach($detail['detail']['__media'] as $media)
                <li
                        class="list-item list-attachments-item"
                >
                    <article
                            class="list-attachments-item-article type--{{$media['type']}}"
                            data-lightbox="true"
                            data-lightbox-type="{{$media['type']}}"
                            data-lightbox-src="{{$uploadPath($media['file_name'], $media['type'])}}"
                    >
                        @switch($media['type'])

                            @case('image')
                            <img
                                    src="{{$uploadPath($media['file_name'], 'image', 'medium')}}"
                                    alt="{{$media['name']}}"
                                    style="max-width: 100%; height: auto;"
                            />
                            @break

                            @case('video')
                            <a
                                    href="{{$uploadPath($media['file_name'], 'video')}}"
                            >
                                {{$media['file_name']}}
                            </a>
                            @break

                            @case('audio')
                            <a
                                    href="{{$uploadPath($media['file_name'], 'audio')}}"
                            >
                                {{$media['file_name']}}
                            </a>
                            @break

                            @case('document')
                            <a
                                    href="{{$uploadPath($media['file_name'], 'document')}}"
                            >
                                {{$media['file_name']}}
                            </a>
                            @break

                            @case('archive')
                            <a
                                    href="{{$uploadPath($media['file_name'], 'archive')}}"
                            >
                                {{$media['file_name']}}
                            </a>
                            @break

                        @endswitch
                    </article>
                </li>
            @endforeach
        </ul>
    </section>
@endif
