@if($detail['detail']['__attachments'])
    <section
        class="section section--attachments"
    >
        <h3
                class="title title--section"
        >
            {{$t('common:title.attachments')}}
        </h3>
        <ul
            class="list list-attachments"
        >
            @foreach($detail['detail']['__attachments'] as $attachment)
                <li
                    class="list-item list-attachments-item"
                >
                    <article
                        class="list-attachments-item-article type--{{$attachment['type']}}"
                        data-lightbox="true"
                        data-lightbox-type="{{$attachment['type']}}"
                        data-lightbox-src="{{$uploadPath($attachment['file_name'], $attachment['type'])}}"
                    >
                        @switch($attachment['type'])

                            @case('image')
                                <img
                                    src="{{$uploadPath($attachment['file_name'], 'image', 'medium')}}"
                                    alt="{{$attachment['name']}}"
                                    style="max-width: 100%; height: auto;"
                                />
                            @break

                            @case('video')
                                <a
                                    href="{{$uploadPath($attachment['file_name'], 'video')}}"
                                >
                                    {{$attachment['file_name']}}
                                </a>
                            @break

                            @case('audio')
                                <a
                                    href="{{$uploadPath($attachment['file_name'], 'audio')}}"
                                >
                                    {{$attachment['file_name']}}
                                </a>
                            @break

                            @case('document')
                                <a
                                    href="{{$uploadPath($attachment['file_name'], 'document')}}"
                                >
                                    {{$attachment['file_name']}}
                                </a>
                            @break

                            @case('archive')
                                <a
                                    href="{{$uploadPath($attachment['file_name'], 'archive')}}"
                                >
                                    {{$attachment['file_name']}}
                                </a>
                            @break

                        @endswitch
                    </article>
                </li>
            @endforeach
        </ul>
    </section>
@endif
