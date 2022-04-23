{{--
Media item: displays only media by type

* $mediaType
* $mediaFileName
* $mediaName

--}}
<article class="component media-item">
    @if($mediaType === 'image')
        @include('component.ui.image', [
            'src' => $uploadPath($mediaFileName, 'image', 'medium'),
            'alt' => $mediaName,
        ])
    @elseif('video')
        <a
                href="{{$uploadPath($mediaFileName, 'video')}}"
        >
            {{$mediaFileName}}
        </a>
    @elseif('audio')
        <a
                href="{{$uploadPath($mediaFileName, 'audio')}}"
        >
            {{$mediaFileName}}
        </a>
    @elseif('document')
        <a
                href="{{$uploadPath($mediaFileName, 'document')}}"
        >
            {{$mediaFileName}}
        </a>
    @elseif('archive')
        <a
                href="{{$uploadPath($mediaFileName, 'archive')}}"
        >
            {{$mediaFileName}}
        </a>
    @else
        <span>No type selected</span>
    @endif
</article>
