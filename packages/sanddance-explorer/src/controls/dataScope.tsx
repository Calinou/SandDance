// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { Button } from './button';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { format } from 'd3-format';
import { strings } from '../language';
import { util } from '@msrvida/sanddance-react';

export enum DataScopeId {
    AllData, SelectedData, FilteredData
}

export interface DataCount {
    all: number;
    filtered: number;
    selected: number;
}

export interface Props {
    dataSet?: React.ReactNode;
    onDataScopeClick: (dataScopeId: DataScopeId) => void;
    onCompactClick: () => void;
    selectedDataScope: DataScopeId;
    dataCount: DataCount;
    active: boolean;
    disabled: boolean;
    compact: boolean;
    themePalette: Partial<FabricTypes.IPalette>;
}

const shortFormat = format('.2~s');

function short(n: number) {
    return n === -1 ? '--' : n ? shortFormat(n) : '0';
}

export function DataScope(props: Props) {
    const dataCount: DataCount = {
        all: -1,
        filtered: -1,
        selected: -1,
        ...props.dataCount
    };
    return props.compact ?
        (
            <div className={util.classList('sanddance-datascope', 'compact')}
                onClick={props.onCompactClick}>
                <Compact
                    {...props}
                    dataScopeId={DataScopeId.AllData}
                    text={strings.selectDataSpanAll}
                    count={dataCount.all}
                />
                <Compact
                    {...props}
                    dataScopeId={DataScopeId.FilteredData}
                    text={strings.selectDataSpanFilter}
                    count={dataCount.filtered}
                />
                <Compact
                    {...props}
                    dataScopeId={DataScopeId.SelectedData}
                    text={strings.selectDataSpanSelection}
                    count={dataCount.selected}
                />
            </div>
        ) : (
            <div className={util.classList('sanddance-datascope', 'extended', props.active && 'active')}>
                <div>
                    <div>{props.dataSet}</div>
                    <div className="datascope-buttons">
                        <DataScopeButton
                            {...props}
                            dataScopeId={DataScopeId.AllData}
                            text={strings.selectDataSpanAll}
                            count={dataCount.all}
                        />
                        <DataScopeButton
                            {...props}
                            dataScopeId={DataScopeId.FilteredData}
                            text={strings.selectDataSpanFilter}
                            count={dataCount.filtered}
                        />
                        <DataScopeButton
                            {...props}
                            dataScopeId={DataScopeId.SelectedData}
                            text={strings.selectDataSpanSelection}
                            count={dataCount.selected}
                        />
                    </div>
                </div>
            </div>
        );
}

function Compact(props: DataScopeButtonProps) {
    return (
        <div
            title={props.text}
            onClick={() => { props.onDataScopeClick(props.dataScopeId); }}
        >{short(props.count)}</div>
    );
}

interface DataScopeButtonProps extends Props {
    text: string;
    count: number;
    dataScopeId: DataScopeId;
}

function DataScopeButton(props: DataScopeButtonProps) {
    return (
        <Button
            themePalette={props.themePalette}
            className={util.classList('datascope-button', props.selectedDataScope === props.dataScopeId && 'selected')}
            disabled={props.disabled}
            text={props.text}
            onClick={() => { props.onDataScopeClick(props.dataScopeId); }}
            onRenderText={() => {
                return (
                    <div title={props.count > 0 ? props.count.toString() : ''}>
                        <label>
                            {props.text}
                        </label>
                        <div>
                            {short(props.count)}
                        </div>
                    </div>
                );
            }}
            onRenderIcon={() => null}
        />
    );
}
