{{--
Detail event meta data
--}}
@if(isset($detail['detail']['type']) && $detail['detail']['type'] == 'event')
    <div class="shared-detail event-meta">
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.start')}}</dt>
            <dd class="ui-dd">{{$formatDateTime($detail['detail']['event_start'])}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.end')}}</dt>
            <dd class="ui-dd">{{$formatDateTime($detail['detail']['event_end'])}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.location')}}</dt>
            <dd class="ui-dd">{{$detail['detail']['event_location'][0] ?? 0}}, {{$detail['detail']['event_location'][1] ?? 0}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.address')}}</dt>
            <dd class="ui-dd">{{$detail['detail']['event_address']}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.city')}}</dt>
            <dd class="ui-dd">{{$detail['detail']['event_city']}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.country')}}</dt>
            <dd class="ui-dd">{{$detail['detail']['event_country']}}</dd>
        </dl>
        <dl class="ui-dl">
            <dt class="ui-dt">{{$t('common:label.zip')}}</dt>
            <dd class="ui-dd">{{$detail['detail']['event_zip']}}</dd>
        </dl>
    </div>
@endif