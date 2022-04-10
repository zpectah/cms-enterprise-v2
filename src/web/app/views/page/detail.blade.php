<main class="view page-view page-view--detail">
    @include('component.section-heading', [
        'title' => $_detail['title'],
        'description' => $_detail['description'],
    ])
    <section class="section section--main">
        blade template: page.detail: {{$detail['model']}}
    </section>
    <section class="section section--paginating">
        detail paginating if category context exist
    </section>
</main>