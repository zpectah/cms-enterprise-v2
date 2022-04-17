<main
    class="main view page-view page-view--error"
>
    @include('component.section-heading', [
        'title' => $t('page:error-404.title'),
    ])
    <section class="section section--main">
        <p>
            {{$t('page:error-404.description')}}
        </p>
    </section>
</main>