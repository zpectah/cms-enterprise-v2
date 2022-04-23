@if($detail['detail']['__media'])
    <div class="shared-detail media">
        <ul class="component media-list">
            @foreach($detail['detail']['__media'] as $media)
                <li class="media-list-item">
                    @include('component.media-item', [
                        'mediaType' => $media['type'],
                        'mediaName' => $media['name'],
                        'mediaFileName' => $media['file_name'],
                    ])
                </li>
            @endforeach
        </ul>
    </div>
@endif