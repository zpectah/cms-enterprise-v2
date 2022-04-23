{{--
Media item: displays only media by type

* $mediaType
* $mediaFileName
* $mediaName

--}}
<article class="media-item">
    @if($mediaType === 'image')
        @include('component.ui.image', [
            'src' => $uploadPath($mediaFileName, 'image', 'medium'),
            'alt' => $mediaName,
            'className' => 'img-thumbnail',
        ])
    @elseif($mediaType === 'video')
        <a href="{{$uploadPath($mediaFileName, 'video')}}">
            {{$mediaFileName}}
        </a>
    @elseif($mediaType === 'audio')
        <a href="{{$uploadPath($mediaFileName, 'audio')}}">
            {{$mediaFileName}}
        </a>
    @elseif($mediaType === 'document')
        <a href="{{$uploadPath($mediaFileName, 'document')}}">
            {{$mediaFileName}}
        </a>
    @elseif($mediaType === 'archive')
        <a href="{{$uploadPath($mediaFileName, 'archive')}}">
            {{$mediaFileName}}
        </a>
    @else
        <span>No type selected</span>
    @endif
</article>
