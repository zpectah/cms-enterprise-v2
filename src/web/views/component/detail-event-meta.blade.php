@if($detail['detail']['type'] == 'event')
    <section
        class="section section--event-meta"
    >
        <dl>
            <dt>{{$t('common:label.start')}}</dt>
            <dd>{{$formatDateTime($detail['detail']['event_start'])}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.end')}}</dt>
            <dd>{{$formatDateTime($detail['detail']['event_end'])}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.location')}}</dt>
            <dd>{{$detail['detail']['event_location'][0] ?? 0}}, {{$detail['detail']['event_location'][1] ?? 0}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.address')}}</dt>
            <dd>{{$detail['detail']['event_address']}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.city')}}</dt>
            <dd>{{$detail['detail']['event_city']}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.country')}}</dt>
            <dd>{{$detail['detail']['event_country']}}</dd>
        </dl>
        <dl>
            <dt>{{$t('common:label.zip')}}</dt>
            <dd>{{$detail['detail']['event_zip']}}</dd>
        </dl>
    </section>
@endif
