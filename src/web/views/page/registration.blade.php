@if($member['actions']['registration'])
    <main class="main view page-view page-view--registration">
        @include('shared.section.heading', [
            'pageTitle' => $t('page:registration.title'),
            'pageDescription' => $t('page:registration.description'),
        ])
        <section class="section section--main">
            @include('component.registration-form')
        </section>
    </main>
@else
    @include('shared.section.error')
@endif
