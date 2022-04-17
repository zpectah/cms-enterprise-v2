<main class="view page-view page-view--detail page-view--detail--{{$detail['model']}}">
    @include('component.section-heading', [
        'title' => $_detail['title'],
        'description' => $_detail['description'],
    ])
    @if($detail['detail']['img_main'])
        <section class="section section--image">
            <img
                src="{{$uploadPath($detail['detail']['img_main'])}}"
                alt="{{$detail['detail']['name']}}"
                style="max-width: 100%; height: auto;"
            />
        </section>
    @endif
    @include('component.section-main', [ 'html' => $_detail['content'] ])
    @include('component.detail-rating')
    @include('component.detail-attachments')
    @include('component.detail-media')
    @include('component.detail-links')
    @include('component.detail-meta')
    @include('component.detail-author')
    @include('component.detail-pagination')
    @include('component.section-comments', [
        'assigned' => 'Posts',
        'assignedId' => $detail['detail']['id'],
    ])
</main>