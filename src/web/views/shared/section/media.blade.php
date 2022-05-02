{{--
Section media

* $mediaType
* $mediaFileName
* $mediaName

--}}
@if(isset($mediaFileName))
    <section class="section section--media">
        @include('component.media-item', [
            'mediaType' => $mediaType,
            'mediaName' => $mediaName,
            'mediaFileName' => $mediaFileName,
        ])
    </section>
@endif