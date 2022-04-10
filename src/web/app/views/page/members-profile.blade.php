@if($members['active'] && $members['members_profile_active'])
    <main class="view page-view page-view--members-profile">
        @include('component.section-heading', [
            'title' => $t('page:members-profile.title'),
            'description' => $t('page:members-profile.description'),
        ])
        <section class="section section--main">
            <member-profile-form>Loading</member-profile-form>
        </section>
    </main>
@else
    <div>
        Sorry, but this option is disabled
    </div>
@endif
