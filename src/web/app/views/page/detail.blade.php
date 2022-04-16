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
    <section class="section section--main">
        {!! $_detail['content'] !!}
    </section>
    @include('component.detail-attachments')
    @include('component.detail-pagination')
    @include('component.detail-meta')
    @include('component.detail-author')
</main>