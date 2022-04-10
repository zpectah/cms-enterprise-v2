@if($members['active'] && $members['members_lostPassword_active'])
    <main class="view page-view page-view--members-lost-password">
        @include('component.section-heading', [
            'title' => $t('page:members-lost-password.title'),
            'description' => $t('page:members-lost-password.description'),
        ])
        <section class="section section--main">
            <member-lost-password-form>Loading</member-lost-password-form>
        </section>
    </main>
@else
    <div>
        Sorry, but this option is disabled
    </div>
@endif
