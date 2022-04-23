@if($member['actions']['registration'])
    <main
        class="main view page-view page-view--registration"
    >
        @include('shared.section.heading', [
            'pageTitle' => $t('page:registration.title'),
            'pageDescription' => $t('page:registration.description'),
        ])
        <section class="section section--main">
            <member-registration-form>Loading</member-registration-form>
        </section>
    </main>
@else
    <div>
        Sorry, but this option is disabled
    </div>
@endif
