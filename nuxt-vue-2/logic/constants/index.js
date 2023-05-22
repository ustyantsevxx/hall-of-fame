// eslint-disable-next-line no-restricted-imports
import { twTheme } from './theme'

export const PROJECT_NAME = 'Dashboard'

export const T_ITEMS_MAP = {
  t00: 'tem_serial_number',
  t01: 'tem_voltage',
  t02: 'tem_cell_voltage',
  t03: 'tem_temperature',
  t04: 'tem_cell_soc',
  t05: 'tem_cell_soh',
  t06: 'tem_cell_internal_resistance',
  t07: 'tem_cell_capacity',
  t08: 'tem_hvil',
  t09: 'tem_hardware_trip',
  t10: 'tem_ssc_network_error',
  t11: 'tem_cell_balance_on',
  t12: 'tem_open_wire_detected',
  t13: 'tem_nb_hw_trip'
}

export const BCC_ITEMS_MAP = {
  b00: 'module_serial_number',
  b01: 'bcc_load_detect',
  b02: 'bcc_network_error',
  b03: 'bcc_module_contactor_closed',
  b04: 'bcc_hardware_error'
}

export const B_TEM_ITEMS_MAP = {
  b05: 'tem_smoke_detector1',
  b06: 'tem_smoke_detector2',
  b07: 'tem_smoke_detector3',
  b08: 'tem_valve_open'
}

export const SSC_ITEMS_MAP = {
  s00: 'ssc_serial_number',
  s01: 'ssc_tems_number',
  s02: 'ssc_bccs_number',
  s03: 'ssc_current',
  s04: 'ssc_discharge_limit',
  s05: 'ssc_charge_limit',
  s06: 'ssc_voltage',
  s07: 'ssc_bus_voltage',
  s08: 'ssc_voltage_difference',
  s09: 'ssc_temperature_difference',
  s10: 'ssc_soc',
  s11: 'ssc_soh',
  s12: 'ssc_max_soc_limit',
  s13: 'ssc_min_soc_limit',
  s14: 'ssc_out_of_balance',
  s15: 'ssc_tem_enumeration_mismatch',
  s16: 'ssc_bcc_enumeration_mismatch',
  s17: 'ssc_local_estop',
  s18: 'ssc_remote_estop',
  s19: 'ssc_string_contactor_positive_closed',
  s20: 'ssc_string_contactor_negative_closed',
  s21: 'ssc_string_contactor_precharge_closed',
  s22: 'ssc_breaker_tripped',
  s23: 'ssc_breaker_mode',
  s24: 'ssc_breaker_error',
  s25: 'ssc_string_hvil',
  s26: 'ssc_ground_fault',
  s27: 'ssc_load_detect',
  s28: 'ssc_hardware_trip',
  s29: 'ssc_msm_network_error',
  s30: 'ssc_primary_power_supply_error',
  s31: 'ssc_backup_power_supply_error',
  s32: 'ssc_fan_error',
  s33: 'ssc_buss_reverse_polarity',
  s34: 'ssc_external_bus_hvil',
  s35: 'ssc_enabled',
  s36: 'ssc_connection_pending',
  s37: 'ssc_connected',
  s38: 'ssc_fault',
  s39: 'ssc_warning',
  s40: 'ssc_error',
  s41: 'ssc_voltage_difference_high',
  s42: 'ssc_temperature_difference_high',
  s43: 'ssc_element_internal_resistance_high',
  s44: 'ssc_element_capacity_difference',
  s45: 'ssc_operating_in_green_zone',
  s46: 'ssc_operating_in_yellow_zone',
  s47: 'ssc_operating_in_red_zone',
  s48: 'ssc_total_energy_per_string',
  s49: 'ssc_primary_CTL_power_error',
  s50: 'ssc_backup_CTL_power_error',
  s51: 'ssc_buss_hvil',
  s52: 'ssc_log_defective',
  s53: 'ssc_slot'
}

export const MSM_ITEMS_MAP = {
  m00: 'msm_serial_number',
  m01: 'msm_sscs_number',
  m02: 'msm_number_of_connected_ssc',
  m03: 'msm_buss_voltage',
  m04: 'msm_current',
  m05: 'msm_discharge_limit',
  m06: 'msm_charge_limit',
  m07: 'msm_soc',
  m08: 'msm_soh',
  m09: 'msm_total_energy',
  m10: 'msm_energy_available',
  m11: 'msm_remaining_energy',
  m12: 'msm_max_soc_limit',
  m13: 'msm_min_soc_limit',
  m14: 'msm_hardware_trip',
  m15: 'msm_ems_network_error',
  m16: 'msm_power_supply_error',
  m17: 'msm_hard_disk_error',
  m18: 'msm_local_control_active',
  m19: 'msm_fault',
  m20: 'msm_warning',
  m21: 'msm_error',
  m22: 'msm_ssc_enabled',
  m23: 'msm_ssc_connected',
  m24: 'msm_ssc_conection_pending',
  m25: 'msm_ssc_fault',
  m26: 'msm_ssc_warning',
  m27: 'msm_ssc_error',
  m28: 'msm_ssc_hardware_status',
  m29: 'msm_primary_CTL_power_error',
  m30: 'msm_backup_CTL_power_error',
  m31: 'msm_local_estop',
  m32: 'msm_remote_estop',
  m33: 'msm_extraction_fan1_error',
  m34: 'msm_extraction_fan2_error',
  m35: 'msm_master_valve1_open',
  m36: 'msm_master_valve2_open',
  m37: 'msm_chiller_fault',
  m38: 'msm_temperature'
}

export const TRUE_FALSE_ONLY_ITEMS = [
  't08',
  't09',
  't10',
  'b01',
  'b02',
  'b03',
  'b04'
]

export const DATA_ITEM_MAP = {
  ...T_ITEMS_MAP,
  ...BCC_ITEMS_MAP,
  ...B_TEM_ITEMS_MAP,
  ...SSC_ITEMS_MAP,
  ...MSM_ITEMS_MAP
}

export const STATUSES = {
  OK: 'ok',
  WARNING: 'warning',
  ERROR: 'error',
  FAULT: 'fault'
}

export const ALARM_STATUSES_FROM_BEST_TO_WORST = [
  STATUSES.OK,
  STATUSES.WARNING,
  STATUSES.ERROR,
  STATUSES.FAULT
]

export const STATUSES_META = {
  [STATUSES.OK]: {
    color: twTheme.colors.green,
    display: 'OK'
  },
  [STATUSES.WARNING]: {
    color: twTheme.colors.yellow,
    display: 'Warning'
  },
  [STATUSES.ERROR]: {
    color: twTheme.colors.orange,
    display: 'Error'
  },
  [STATUSES.FAULT]: {
    color: twTheme.colors.red,
    display: 'Fault'
  }
}
