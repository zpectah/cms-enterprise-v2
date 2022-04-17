<main
    class="main view page-view page-view--detail page-view--detail--{{$detail['model']}} type-{{$detail['detail']['type']}}"
>
    @include('component.section-heading', [
        'title' => $_detail['title'],
        'description' => $_detail['description'],
    ])
    @include('component.section-main-image', [
        'image' => $detail['detail']['img_main'],
        'alt' => $detail['detail']['name'],
    ])
    @include('component.section-main', [
        'html' => $_detail['content'],
    ])
    @include('component.detail-rating')
    @include('component.detail-media')
    @include('component.detail-attachments')
    @include('component.detail-links')
    @include('component.detail-event-meta')
    @include('component.detail-meta')
    @include('component.detail-author')
    @include('component.detail-pagination')
    @include('component.section-comments', [
        'assigned' => ucwords($detail['model']),
        'assignedId' => $detail['detail']['id'],
    ])
</main>