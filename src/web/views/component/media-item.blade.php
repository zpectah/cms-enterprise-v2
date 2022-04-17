@switch($mediaType)

    @case('image')
        <img
            src="{{$uploadPath($mediaFileName, 'image', 'medium')}}"
            alt="{{$mediaName}}"
            class="img-fluid img-thumbnail"
            loading="lazy"
        />
    @break

    @case('video')
        <a
            href="{{$uploadPath($mediaFileName, 'video')}}"
        >
            {{$mediaFileName}}
        </a>
    @break

    @case('audio')
        <a
            href="{{$uploadPath($mediaFileName, 'audio')}}"
        >
            {{$mediaFileName}}
        </a>
    @break

    @case('document')
        <a
            href="{{$uploadPath($mediaFileName, 'document')}}"
        >
            {{$mediaFileName}}
        </a>
    @break

    @case('archive')
        <a
            href="{{$uploadPath($mediaFileName, 'archive')}}"
        >
            {{$mediaFileName}}
        </a>
    @break

@endswitch