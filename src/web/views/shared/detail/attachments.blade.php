@if($detail['detail']['__attachments'])
    <div class="shared-detail attachments">
        <ul class="component media-list">
            @foreach($detail['detail']['__attachments'] as $attachment)
                <li class="media-list-item">
                    @include('component.media-item', [
                        'mediaType' => $attachment['type'],
                        'mediaName' => $attachment['name'],
                        'mediaFileName' => $attachment['file_name'],
                    ])
                </li>
            @endforeach
        </ul>
    </div>
@endif