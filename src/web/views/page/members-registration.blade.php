@if($members_options['active'] && $members_options['members_register_active'])
    <main
        class="main view page-view page-view--members-registration"
    >
        @include('component.section-heading', [
            'title' => $t('page:members-registration.title'),
            'description' => $t('page:members-registration.description'),
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
