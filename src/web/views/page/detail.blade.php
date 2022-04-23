<main
    class="main view page-view page-view--detail page-view--detail--{{$detail['model']}} type-{{$detail['detail']['type']}}"
>
    @if(!$detail['detail'])
        @include('shared.detail.error')
    @else
        @include('shared.section.heading', [
            'pageTitle' => $_detail['title'],
            'pageDescription' => $_detail['description'],
        ])
        @include('shared.section.media', [
            'mediaType' => 'image',
            'mediaName' => $detail['detail']['name'],
            'mediaFileName' => $detail['detail']['img_main'],
        ])
        @include('shared.section.main', [
            'html' => $_detail['content'],
        ])
        @if($detail['detail']['__links'])
            <section class="section">
                <h3 class="title title--section">
                    {{$t('common:label.links')}}
                </h3>
                @include('shared.detail.links')
            </section>
        @endif
        <section class="section">
            @include('shared.detail.rating')
            @include('shared.detail.media')
            @include('shared.detail.attachments')
            @include('shared.detail.event-meta')
            @include('shared.detail.meta')
            @include('shared.detail.author-meta')
            @include('shared.detail.pagination')
        </section>
        @include('shared.section.comments', [
            'assigned' => ucwords($detail['model']),
            'assignedId' => $detail['detail']['id'],
        ])
    @endif
</main>